
import express from "express";
import mongoose from "mongoose";
import User from "../models/UserDetails.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| CREATE BLADEPAY PAYMENT
|--------------------------------------------------------------------------
| POST /api/payment/create
|--------------------------------------------------------------------------
| ONE PAYMENT RECORD PER USER
|--------------------------------------------------------------------------
*/

router.post("/create", async (req, res) => {
  try {
    const {
      userId,
      merchantOrderNo,
      amount,
    } = req.body;

    console.log("========== PAYMENT CREATE ==========");
    console.log("User ID:", userId);
    console.log("Merchant Order No:", merchantOrderNo);
    console.log("Amount:", amount);

    /*
    |--------------------------------------------------------------------------
    | VALIDATION
    |--------------------------------------------------------------------------
    */

    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: "User ID is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        code: 400,
        message: "Invalid User ID.",
      });
    }

    if (!merchantOrderNo) {
      return res.status(400).json({
        code: 400,
        message: "Merchant order number is required.",
      });
    }

    const paymentAmount = Number(amount);

    if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
      return res.status(400).json({
        code: 400,
        message: "Invalid payment amount.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | FIND APPLICANT
    |--------------------------------------------------------------------------
    */

    const user = await User.findById(userId);

    if (!user) {
      console.log("Applicant not found:", userId);

      return res.status(404).json({
        code: 404,
        message: "Applicant not found.",
      });
    }

    console.log("Applicant found:", {
      id: user._id,
      registrationNumber: user.registrationNumber,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      category: user.category,
    });

    /*
    |--------------------------------------------------------------------------
    | VALIDATE APPLICANT
    |--------------------------------------------------------------------------
    */

    if (!user.name?.trim()) {
      return res.status(400).json({
        code: 400,
        message: "Applicant name not found.",
      });
    }

    if (!user.mobile?.trim()) {
      return res.status(400).json({
        code: 400,
        message: "Applicant mobile number not found.",
      });
    }

    if (!user.email?.trim()) {
      return res.status(400).json({
        code: 400,
        message: "Applicant email not found.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CHECK BLADEPAY API KEY
    |--------------------------------------------------------------------------
    */

    if (!process.env.BLADEPAY_API_KEY) {
      console.error("BLADEPAY_API_KEY is not configured.");

      return res.status(500).json({
        code: 500,
        message: "BladePay API configuration is missing.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | DATABASE
    |--------------------------------------------------------------------------
    */

    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({
        code: 500,
        message: "Database connection is not available.",
      });
    }

    const db = mongoose.connection.db;

    if (!db) {
      return res.status(500).json({
        code: 500,
        message: "Database is not available.",
      });
    }

    const paymentsCollection = db.collection("feedetails");

    const objectUserId = new mongoose.Types.ObjectId(userId);

    /*
    |--------------------------------------------------------------------------
    | FIND EXISTING PAYMENT
    |--------------------------------------------------------------------------
    |
    | ONE USER = ONE PAYMENT DOCUMENT
    |
    */

    let payment = await paymentsCollection.findOne({
      userId: objectUserId,
    });

    let paymentId;

    /*
    |--------------------------------------------------------------------------
    | EXISTING PAYMENT
    |--------------------------------------------------------------------------
    */

    if (payment) {
      console.log(
        "Existing payment found:",
        payment._id.toString()
      );

      /*
      |--------------------------------------------------------------------------
      | IMPORTANT
      |--------------------------------------------------------------------------
      | payinState = 1 means SUCCESS.
      |
      | If payment is already successful, do not create another
      | BladePay payment and do not reset the database to Pending.
      |--------------------------------------------------------------------------
      */

      if (Number(payment.payinState) === 1) {
        console.log(
          "Payment already successful. New payment is not allowed."
        );

        return res.status(400).json({
          code: 400,
          message: "Payment already completed for this applicant.",
          payment: {
            id: payment._id.toString(),
            userId: payment.userId.toString(),
            merchantOrderNo:
              payment.merchantOrderNo || null,
            gatewayOrderNo:
              payment.gatewayOrderNo || null,
            amount:
              payment.amount || paymentAmount,
            category:
              payment.category || user.category || "-",
            paymentStatus: "Success",
            payinState: 1,
          },
        });
      }

      /*
      |--------------------------------------------------------------------------
      | EXISTING PAYMENT IS NOT SUCCESSFUL
      |--------------------------------------------------------------------------
      | Allow retry using the SAME MongoDB document.
      |--------------------------------------------------------------------------
      */

      await paymentsCollection.updateOne(
        {
          _id: payment._id,
        },
        {
          $set: {
            merchantOrderNo,
            amount: paymentAmount,
            category: user.category || "-",
            paymentStatus: "Pending",
            gatewayOrderNo: null,
            payinState: null,
            updatedAt: new Date(),
          },
        }
      );

      paymentId = payment._id;

      console.log(
        "Existing payment reset for new transaction:",
        paymentId.toString()
      );
    }

    /*
    |--------------------------------------------------------------------------
    | FIRST PAYMENT
    |--------------------------------------------------------------------------
    */

    else {
      console.log(
        "No payment found. Creating first payment."
      );

      const initialPayment = {
        userId: objectUserId,

        merchantOrderNo,

        amount: paymentAmount,

        category: user.category || "-",

        paymentStatus: "Pending",

        gatewayOrderNo: null,

        payinState: null,

        createdAt: new Date(),

        updatedAt: new Date(),
      };

      try {
        const insertedPayment =
          await paymentsCollection.insertOne(
            initialPayment
          );

        paymentId =
          insertedPayment.insertedId;

        console.log(
          "New payment created:",
          paymentId.toString()
        );
      } catch (insertError) {
        /*
        |--------------------------------------------------------------------------
        | HANDLE UNIQUE userId INDEX
        |--------------------------------------------------------------------------
        | If another request created the record at the same time,
        | fetch that existing payment instead of creating another.
        |--------------------------------------------------------------------------
        */

        if (insertError?.code === 11000) {
          console.log(
            "Duplicate userId detected. Fetching existing payment."
          );

          payment =
            await paymentsCollection.findOne({
              userId: objectUserId,
            });

          if (!payment) {
            throw insertError;
          }

          /*
          |--------------------------------------------------------------------------
          | If concurrent request already completed payment
          |--------------------------------------------------------------------------
          */

          if (Number(payment.payinState) === 1) {
            return res.status(400).json({
              code: 400,
              message:
                "Payment already completed for this applicant.",
              payment: {
                id: payment._id.toString(),
                userId: payment.userId.toString(),
                merchantOrderNo:
                  payment.merchantOrderNo || null,
                gatewayOrderNo:
                  payment.gatewayOrderNo || null,
                amount:
                  payment.amount || paymentAmount,
                category:
                  payment.category || user.category || "-",
                paymentStatus: "Success",
                payinState: 1,
              },
            });
          }

          await paymentsCollection.updateOne(
            {
              _id: payment._id,
            },
            {
              $set: {
                merchantOrderNo,
                amount: paymentAmount,
                category: user.category || "-",
                paymentStatus: "Pending",
                gatewayOrderNo: null,
                payinState: null,
                updatedAt: new Date(),
              },
            }
          );

          paymentId = payment._id;
        } else {
          throw insertError;
        }
      }
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE BLADEPAY PAYMENT
    |--------------------------------------------------------------------------
    */

    const bladePayResponse = await fetch(
      "https://api.bladepay.pro/merchant/api/payin/create",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${process.env.BLADEPAY_API_KEY}`,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          merchantOrderNo,

          amount:
            paymentAmount.toFixed(2),

          currency: "INR",

          payinName:
            user.name.trim(),

          payinPhone:
            user.mobile.trim(),

          payinEmail:
            user.email.trim(),

          /*
          |--------------------------------------------------------------------------
          | PUBLIC WEBHOOK
          |--------------------------------------------------------------------------
          */

          notifyUrl:
            "https://cllnew.onrender.com/api/payment/webhook",

          /*
          |--------------------------------------------------------------------------
          | RETURN URL
          |--------------------------------------------------------------------------
          */

          returnUrl:
            "https://cllnew.onrender.com/payment-success",
        }),
      }
    );

    /*
    |--------------------------------------------------------------------------
    | READ BLADEPAY RESPONSE
    |--------------------------------------------------------------------------
    */

    let data = {};

    try {
      data =
        await bladePayResponse.json();
    } catch (error) {
      console.error(
        "BladePay returned invalid JSON."
      );

      await paymentsCollection.updateOne(
        {
          _id: paymentId,
        },
        {
          $set: {
            paymentStatus: "Failed",
            updatedAt: new Date(),
          },
        }
      );

      return res.status(502).json({
        code: 502,
        message:
          "Invalid response received from BladePay.",
      });
    }

    console.log(
      "BladePay HTTP Status:",
      bladePayResponse.status
    );

    console.log(
      "BladePay Response:",
      data
    );

    /*
    |--------------------------------------------------------------------------
    | HTTP ERROR
    |--------------------------------------------------------------------------
    */

    if (!bladePayResponse.ok) {
      await paymentsCollection.updateOne(
        {
          _id: paymentId,
        },
        {
          $set: {
            paymentStatus: "Failed",
            updatedAt: new Date(),
          },
        }
      );

      return res.status(
        bladePayResponse.status
      ).json({
        code:
          data?.code ||
          bladePayResponse.status,

        message:
          data?.msg ||
          data?.message ||
          "BladePay payment creation failed.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | API ERROR
    |--------------------------------------------------------------------------
    */

    if (data?.code !== 0) {
      await paymentsCollection.updateOne(
        {
          _id: paymentId,
        },
        {
          $set: {
            paymentStatus: "Failed",
            updatedAt: new Date(),
          },
        }
      );

      return res.status(400).json({
        code:
          data?.code ?? 400,

        message:
          data?.msg ||
          data?.message ||
          "Unable to create payment.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CHECK DATA
    |--------------------------------------------------------------------------
    */

    if (!data?.data) {
      console.error(
        "BladePay response does not contain data:",
        data
      );

      await paymentsCollection.updateOne(
        {
          _id: paymentId,
        },
        {
          $set: {
            paymentStatus: "Failed",
            updatedAt: new Date(),
          },
        }
      );

      return res.status(400).json({
        code: 400,
        message:
          "Invalid payment response from BladePay.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CHECK CASHIER URL
    |--------------------------------------------------------------------------
    */

    if (!data.data.cashierUrl) {
      console.error(
        "BladePay did not return cashierUrl:",
        data
      );

      await paymentsCollection.updateOne(
        {
          _id: paymentId,
        },
        {
          $set: {
            paymentStatus: "Failed",
            updatedAt: new Date(),
          },
        }
      );

      return res.status(400).json({
        code: 400,
        message:
          "Payment URL was not returned by BladePay.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | PAYMENT DATA FROM BLADEPAY
    |--------------------------------------------------------------------------
    */

    const finalMerchantOrderNo =
      data.data.merchantOrderNo ||
      merchantOrderNo;

    const gatewayOrderNo =
      data.data.gatewayOrderNo ||
      null;

    const payinState =
      data.data.payinState ??
      null;

    const bladePayAmount =
      data.data.amount ??
      paymentAmount;

    /*
    |--------------------------------------------------------------------------
    | DETERMINE INITIAL PAYMENT STATUS
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    | payinState = 1 means SUCCESS.
    |--------------------------------------------------------------------------
    */

    let initialPaymentStatus = "Pending";

    if (Number(payinState) === 1) {
      initialPaymentStatus = "Success";
    } else if (Number(payinState) === 0) {
      initialPaymentStatus = "Failed";
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE SAME PAYMENT RECORD
    |--------------------------------------------------------------------------
    */

    await paymentsCollection.updateOne(
      {
        _id: paymentId,
      },
      {
        $set: {
          merchantOrderNo:
            finalMerchantOrderNo,

          gatewayOrderNo,

          payinState,

          paymentStatus:
            initialPaymentStatus,

          amount:
            Number(bladePayAmount),

          updatedAt:
            new Date(),
        },
      }
    );

    /*
    |--------------------------------------------------------------------------
    | LOG
    |--------------------------------------------------------------------------
    */

    console.log(
      "========== PAYMENT CREATED =========="
    );

    console.log(
      "Mongo Payment ID:",
      paymentId.toString()
    );

    console.log(
      "Merchant Order No:",
      finalMerchantOrderNo
    );

    console.log(
      "Gateway Order No:",
      gatewayOrderNo
    );

    console.log(
      "Payin State:",
      payinState
    );

    console.log(
      "Payment Status:",
      initialPaymentStatus
    );

    console.log(
      "Amount:",
      bladePayAmount
    );

    console.log(
      "Cashier URL:",
      data.data.cashierUrl
    );

    console.log(
      "====================================="
    );

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return res.status(200).json({
      code: 0,

      msg:
        data.msg ||
        "success",

      data: {
        paymentId:
          paymentId.toString(),

        merchantOrderNo:
          finalMerchantOrderNo,

        gatewayOrderNo,

        cashierUrl:
          data.data.cashierUrl,

        amount:
          bladePayAmount,

        payinState,

        paymentStatus:
          initialPaymentStatus,

        createdAt:
          data.data.createdAt ||
          null,
      },
    });

  } catch (error) {
    console.error(
      "========== PAYMENT ERROR =========="
    );

    console.error(
      "Message:",
      error.message
    );

    console.error(
      "Stack:",
      error.stack
    );

    console.error(
      "==================================="
    );

    return res.status(500).json({
      code: 500,

      message:
        error.message ||
        "Server error while creating payment.",
    });
  }
});


/*
|--------------------------------------------------------------------------
| BLADEPAY WEBHOOK
|--------------------------------------------------------------------------
| POST /api/payment/webhook
|--------------------------------------------------------------------------
| payinState = 1 => SUCCESS
| payinState = 0 => FAILED
|--------------------------------------------------------------------------
*/

router.post(
  "/webhook",
  async (req, res) => {
    try {
      console.log(
        "========== BLADEPAY WEBHOOK =========="
      );

      console.log(
        "Webhook Body:",
        JSON.stringify(
          req.body,
          null,
          2
        )
      );

      const webhookData =
        req.body || {};

      /*
      |--------------------------------------------------------------------------
      | GET WEBHOOK DATA
      |--------------------------------------------------------------------------
      */

      const merchantOrderNo =
        webhookData.merchantOrderNo ||
        webhookData.data?.merchantOrderNo ||
        null;

      const gatewayOrderNo =
        webhookData.gatewayOrderNo ||
        webhookData.data?.gatewayOrderNo ||
        null;

      const payinState =
        webhookData.payinState ??
        webhookData.data?.payinState ??
        null;

      const amount =
        webhookData.amount ??
        webhookData.data?.amount ??
        null;

      /*
      |--------------------------------------------------------------------------
      | LOG WEBHOOK VALUES
      |--------------------------------------------------------------------------
      */

      console.log(
        "Merchant Order No:",
        merchantOrderNo
      );

      console.log(
        "Gateway Order No:",
        gatewayOrderNo
      );

      console.log(
        "Payin State:",
        payinState
      );

      console.log(
        "Amount:",
        amount
      );

      /*
      |--------------------------------------------------------------------------
      | DATABASE
      |--------------------------------------------------------------------------
      */

      if (
        mongoose.connection.readyState !==
        1
      ) {
        console.error(
          "MongoDB connection unavailable."
        );

        return res.status(500).json({
          code: 500,
          message:
            "Database connection unavailable.",
        });
      }

      const db =
        mongoose.connection.db;

      if (!db) {
        return res.status(500).json({
          code: 500,
          message:
            "Database connection unavailable.",
        });
      }

      const paymentsCollection =
        db.collection("feedetails");

      /*
      |--------------------------------------------------------------------------
      | FIND PAYMENT
      |--------------------------------------------------------------------------
      */

      let payment = null;

      if (merchantOrderNo) {
        payment =
          await paymentsCollection.findOne({
            merchantOrderNo,
          });
      }

      if (
        !payment &&
        gatewayOrderNo
      ) {
        payment =
          await paymentsCollection.findOne({
            gatewayOrderNo,
          });
      }

      /*
      |--------------------------------------------------------------------------
      | PAYMENT NOT FOUND
      |--------------------------------------------------------------------------
      */

      if (!payment) {
        console.error(
          "Payment record not found.",
          {
            merchantOrderNo,
            gatewayOrderNo,
          }
        );

        return res.status(200).json({
          code: 0,
          message:
            "Webhook received but payment record was not found.",
        });
      }

      console.log(
        "Payment Mongo ID:",
        payment._id.toString()
      );

      /*
      |--------------------------------------------------------------------------
      | PAYMENT STATUS
      |--------------------------------------------------------------------------
      |
      | VERY IMPORTANT:
      |
      | payinState = 1 => SUCCESS
      | payinState = 0 => FAILED
      | anything else => PENDING
      |--------------------------------------------------------------------------
      */

      let paymentStatus = "Pending";

      if (Number(payinState) === 1) {
        paymentStatus = "Success";
      } else if (Number(payinState) === 0) {
        paymentStatus = "Failed";
      }

      console.log(
        "========== PAYMENT STATE =========="
      );

      console.log(
        "Raw Payin State:",
        payinState
      );

      console.log(
        "Number Payin State:",
        Number(payinState)
      );

      console.log(
        "Final Payment Status:",
        paymentStatus
      );

      console.log(
        "==================================="
      );

      /*
      |--------------------------------------------------------------------------
      | NEVER DOWNGRADE SUCCESS
      |--------------------------------------------------------------------------
      |
      | If MongoDB already contains payinState = 1,
      | do not allow a later Pending webhook to change it.
      |--------------------------------------------------------------------------
      */

      if (
        Number(payment.payinState) === 1 &&
        Number(payinState) !== 1
      ) {
        console.log(
          "Existing payment is already SUCCESS."
        );

        console.log(
          "Ignoring non-success webhook."
        );

        return res.status(200).json({
          code: 0,
          message:
            "Payment already successful.",
          paymentStatus: "Success",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | UPDATE PAYMENT
      |--------------------------------------------------------------------------
      */

      const updateData = {
        paymentStatus,

        payinState,

        updatedAt:
          new Date(),
      };

      /*
      |--------------------------------------------------------------------------
      | UPDATE GATEWAY ORDER NUMBER
      |--------------------------------------------------------------------------
      */

      if (gatewayOrderNo) {
        updateData.gatewayOrderNo =
          gatewayOrderNo;
      }

      /*
      |--------------------------------------------------------------------------
      | UPDATE MERCHANT ORDER NUMBER
      |--------------------------------------------------------------------------
      */

      if (merchantOrderNo) {
        updateData.merchantOrderNo =
          merchantOrderNo;
      }

      /*
      |--------------------------------------------------------------------------
      | UPDATE AMOUNT
      |--------------------------------------------------------------------------
      */

      if (amount !== null) {
        const numericAmount =
          Number(amount);

        if (
          Number.isFinite(
            numericAmount
          )
        ) {
          updateData.amount =
            numericAmount;
        }
      }

      /*
      |--------------------------------------------------------------------------
      | SAVE PAYMENT STATUS
      |--------------------------------------------------------------------------
      */

      const updateResult =
        await paymentsCollection.updateOne(
          {
            _id:
              payment._id,
          },
          {
            $set:
              updateData,
          }
        );

      console.log(
        "MongoDB Update Result:",
        updateResult
      );

      /*
      |--------------------------------------------------------------------------
      | FINAL LOG
      |--------------------------------------------------------------------------
      */

      console.log(
        "========== PAYMENT UPDATED =========="
      );

      console.log(
        "Payment ID:",
        payment._id.toString()
      );

      console.log(
        "Payment Status:",
        paymentStatus
      );

      console.log(
        "Payin State:",
        payinState
      );

      console.log(
        "======================================"
      );

      /*
      |--------------------------------------------------------------------------
      | WEBHOOK RESPONSE
      |--------------------------------------------------------------------------
      */

      return res.status(200).json({
        code: 0,

        message:
          "Webhook received successfully.",

        paymentStatus,

        payinState,
      });

    } catch (error) {
      console.error(
        "========== WEBHOOK ERROR =========="
      );

      console.error(
        "Message:",
        error.message
      );

      console.error(
        "Stack:",
        error.stack
      );

      console.error(
        "==================================="
      );

      return res.status(500).json({
        code: 500,
        message:
          "Webhook processing failed.",
      });
    }
  }
);


/*
|--------------------------------------------------------------------------
| PAYMENT RECEIPT
|--------------------------------------------------------------------------
| GET /api/payment/receipt/:userId
|--------------------------------------------------------------------------
*/

router.get(
  "/receipt/:userId",
  async (req, res) => {
    try {
      const { userId } =
        req.params;

      console.log(
        "========== PAYMENT RECEIPT =========="
      );

      console.log(
        "User ID:",
        userId
      );

      /*
      |--------------------------------------------------------------------------
      | VALIDATE USER ID
      |--------------------------------------------------------------------------
      */

      if (!userId) {
        return res.status(400).json({
          success: false,
          message:
            "User ID is required.",
        });
      }

      if (
        !mongoose.Types.ObjectId.isValid(
          userId
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid User ID.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | DATABASE
      |--------------------------------------------------------------------------
      */

      if (
        mongoose.connection.readyState !==
        1
      ) {
        return res.status(500).json({
          success: false,
          message:
            "Database connection is not available.",
        });
      }

      const db =
        mongoose.connection.db;

      if (!db) {
        return res.status(500).json({
          success: false,
          message:
            "Database is not available.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | FIND APPLICANT
      |--------------------------------------------------------------------------
      */

      const user =
        await User.findById(
          userId
        ).lean();

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "Applicant not found.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | PAYMENTS COLLECTION
      |--------------------------------------------------------------------------
      */

      const paymentsCollection =
        db.collection(
          "feedetails"
        );

      /*
      |--------------------------------------------------------------------------
      | FIND PAYMENT
      |--------------------------------------------------------------------------
      */

      const payment =
        await paymentsCollection.findOne({
          userId:
            new mongoose.Types.ObjectId(
              userId
            ),
        });

      console.log(
        "Payment found:",
        payment
          ? "YES"
          : "NO"
      );

      if (!payment) {
        return res.status(404).json({
          success: false,
          message:
            "No payment receipt found for this applicant.",
        });
      }

      console.log(
        "Payment:",
        payment
      );

      /*
      |--------------------------------------------------------------------------
      | NORMALIZE STATUS
      |--------------------------------------------------------------------------
      |
      | payinState = 1 ALWAYS means SUCCESS.
      |--------------------------------------------------------------------------
      */

      let normalizedPaymentStatus =
        "Pending";

      /*
      |--------------------------------------------------------------------------
      | FIRST PRIORITY: payinState
      |--------------------------------------------------------------------------
      */

      if (
        Number(payment.payinState) === 1
      ) {
        normalizedPaymentStatus =
          "Success";
      }

      /*
      |--------------------------------------------------------------------------
      | SECOND PRIORITY: paymentStatus
      |--------------------------------------------------------------------------
      */

      else {
        const dbStatus =
          String(
            payment.paymentStatus ||
            ""
          )
            .trim()
            .toLowerCase();

        if (
          [
            "success",
            "successful",
            "succeeded",
            "paid",
            "completed",
            "complete",
          ].includes(dbStatus)
        ) {
          normalizedPaymentStatus =
            "Success";
        }

        else if (
          [
            "failed",
            "fail",
            "failure",
            "cancelled",
            "canceled",
            "rejected",
            "declined",
          ].includes(dbStatus)
        ) {
          normalizedPaymentStatus =
            "Failed";
        }
      }

      /*
      |--------------------------------------------------------------------------
      | RESPONSE
      |--------------------------------------------------------------------------
      */

      const responseData = {
        success: true,

        payment: {
          id:
            payment._id
              ? payment._id.toString()
              : null,

          userId:
            payment.userId
              ? payment.userId.toString()
              : userId,

          merchantOrderNo:
            payment.merchantOrderNo ||
            null,

          gatewayOrderNo:
            payment.gatewayOrderNo ||
            null,

          amount:
            payment.amount ??
            0,

          category:
            payment.category ||
            user.category ||
            "-",

          paymentStatus:
            normalizedPaymentStatus,

          payinState:
            payment.payinState ??
            null,

          createdAt:
            payment.createdAt ||
            null,

          updatedAt:
            payment.updatedAt ||
            null,
        },

        applicant: {
          id:
            user._id
              ? user._id.toString()
              : userId,

          name:
            user.name ||
            "-",

          mobile:
            user.mobile ||
            "-",

          email:
            user.email ||
            "-",

          registrationNumber:
            user.registrationNumber ||
            "-",

          category:
            user.category ||
            payment.category ||
            "-",
        },
      };

      console.log(
        "PAYMENT RECEIPT RESPONSE:",
        responseData
      );

      console.log(
        "===================================="
      );

      return res.status(200).json(
        responseData
      );

    } catch (error) {
      console.error(
        "========== PAYMENT RECEIPT ERROR =========="
      );

      console.error(
        "Message:",
        error.message
      );

      console.error(
        "Stack:",
        error.stack
      );

      console.error(
        "==========================================="
      );

      return res.status(500).json({
        success: false,
        message:
          "Server error while fetching payment receipt.",
      });
    }
  }
);


export default router;
