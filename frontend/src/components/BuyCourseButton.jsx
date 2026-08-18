import React from 'react'
import { Button } from './ui/button'
import { useCreateRazorpayOrderMutation, useVerifyRazorpayPaymentMutation } from '@/api/purchaseApi'
import { Loader2 } from 'lucide-react';

const BuyCourseButton = ({ courseId }) => {

  const [createRazorPayOrder, { isLoading }] = useCreateRazorpayOrderMutation();
  const [verifyRazorpayPayment] = useVerifyRazorpayPaymentMutation();

  const purchaseCourseHandler = async () => {
    try {
      const result = await createRazorPayOrder(courseId).unwrap();

      if (!result.success) {
        return;
      }

      const options = {
        key: result.key,
        amount: result.order.amount,
        currency: result.order.currency,
        name: "Learn  Infinity",
        description: "Course Purchase",

        order_id: result.order.id,

        handler: async function (response) {
          try {
            const result = await verifyRazorpayPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }).unwrap();

            console.log("Verification result:", result);

          } catch (error) {
            console.error("Payment verification failed:", error);
          }
        },

        theme: {
          color: "#2f494c",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button disabled={isLoading} className="w-full h-10 bg-[#2f494c] dark:bg-[#0e0f12] dark:text-slate-200 cursor-pointer" onClick={purchaseCourseHandler}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  )
}

export default BuyCourseButton
