import { useQuery } from "@tanstack/react-query";

import { http } from "../../utils/http";

const fetchPayments = async () => {
  const response = await http.get("payments");
  return response.data.data;
};

const PaymentsList = () => {
  const {
    data: paymentsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: fetchPayments,
  });
  if (paymentsData) {
    console.log("paysmentsData", paymentsData);
  }

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">{error.message}</div>;

  const payments = paymentsData.pageContent;

  return (
    <div className="container mx-auto !ml-[200px] px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">User Payments</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg bg-white shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Payment ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.paymentId} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">{payment.paymentId}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={payment.user.imageUrl}
                      alt={`${payment.user.firstName} ${payment.user.lastName}`}
                      className="mr-3 h-8 w-8 rounded-full"
                    />
                    <span>
                      {payment.user.firstName} {payment.user.lastName}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">{payment.paymentMethod}</td>
                <td className="whitespace-nowrap px-6 py-4">${payment.amount.toFixed(2)}</td>
                <td className="whitespace-nowrap px-6 py-4">{payment.user.emailOrPhone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsList;
