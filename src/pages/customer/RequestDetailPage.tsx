import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  CreditCard, 
  Star, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useCustomer } from "../../contexts/CustomerContext";
import { Timeline } from "../../components/ui/Timeline";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { mockTransactions, TransactionStatus } from "../../data/transactions";
import toast from "react-hot-toast";
import { cn } from "../../lib/utils";

export default function RequestDetailPage() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { requests, cancelRequest } = useCustomer();
  
  // Find in mock transactions or context
  const contextReq = requests.find(r => r.id === requestId);
  const mockTxn = mockTransactions.find(t => t.id === requestId);
  
  // Simulate real-time status updates
  const [currentStatus, setCurrentStatus] = useState<TransactionStatus>(
    mockTxn?.status || "submitted"
  );
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Use mock transaction data for demo
  const transaction = mockTxn || {
    id: requestId || "req-new",
    customerName: "You",
    customerEmail: "customer@example.com",
    customerPhone: "+63 912 345 6789",
    technicianId: "tech-1",
    technicianName: "Juan Dela Cruz",
    technicianPhone: "+63 917 123 4567",
    technicianAvatar: "/Technician.png",
    serviceCategory: "smartphone" as const,
    serviceTitle: contextReq?.title || "Service Request",
    serviceDescription: "Your service request",
    scheduledDate: "2025-12-28",
    scheduledTime: "10:00",
    estimatedPrice: contextReq?.total || 2500,
    status: currentStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    timeline: [
      { id: "t1", status: "submitted" as const, timestamp: new Date().toISOString(), description: "Request submitted", actor: "customer" as const },
    ]
  };

  const handleCancel = () => {
    if (contextReq) {
      cancelRequest(contextReq.id);
    }
    setCurrentStatus("cancelled");
    setShowCancelConfirm(false);
    toast.success("Request cancelled successfully");
  };

  const handleConfirmCompletion = () => {
    setCurrentStatus("completed");
    toast.success("Service marked as complete!");
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessingPayment(false);
    setCurrentStatus("paid");
    setShowPaymentModal(false);
    toast.success("Payment successful! Thank you.");
  };

  const canCancel = ["submitted", "awaiting_technician", "assigned"].includes(currentStatus);
  const canConfirmCompletion = currentStatus === "in_progress";
  const needsPayment = currentStatus === "completed";

  if (!contextReq && !mockTxn) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-lg font-semibold mb-2">Request not found</h2>
        <p className="text-muted-foreground mb-4">This request may have been deleted or doesn't exist.</p>
        <Link to="/dashboard/customer/requests" className="text-primary-600 hover:underline">
          ← Back to My Requests
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            to="/dashboard/customer/requests"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to My Requests
          </Link>
          <h1 className="text-2xl font-bold">{transaction.serviceTitle}</h1>
          <p className="text-muted-foreground mt-1">Request ID: {transaction.id}</p>
        </div>
        <StatusBadge status={currentStatus} size="lg" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Status Card */}
          <div className={cn(
            "rounded-xl border p-6 transition-all",
            currentStatus === "on_the_way" && "bg-purple-50 border-purple-200",
            currentStatus === "in_progress" && "bg-cyan-50 border-cyan-200",
            currentStatus === "completed" && "bg-emerald-50 border-emerald-200",
            currentStatus === "paid" && "bg-green-50 border-green-200",
            !["on_the_way", "in_progress", "completed", "paid"].includes(currentStatus) && "bg-card border-border"
          )}>
            <div className="flex items-center gap-4">
              {currentStatus === "on_the_way" && (
                <>
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center animate-pulse">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-900">Technician is on the way!</h3>
                    <p className="text-sm text-purple-700">ETA: ~15 minutes</p>
                  </div>
                </>
              )}
              {currentStatus === "in_progress" && (
                <>
                  <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center animate-pulse">
                    <Clock className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cyan-900">Work in progress</h3>
                    <p className="text-sm text-cyan-700">Your technician is working on your request</p>
                  </div>
                </>
              )}
              {currentStatus === "completed" && (
                <>
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-emerald-900">Service completed!</h3>
                    <p className="text-sm text-emerald-700">Please proceed to payment</p>
                  </div>
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Pay Now
                  </button>
                </>
              )}
              {currentStatus === "paid" && (
                <>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">Payment complete!</h3>
                    <p className="text-sm text-green-700">Thank you for using our service</p>
                  </div>
                </>
              )}
              {["submitted", "awaiting_technician", "assigned"].includes(currentStatus) && (
                <>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Awaiting confirmation</h3>
                    <p className="text-sm text-muted-foreground">We'll notify you once a technician is assigned</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-6">Progress Timeline</h3>
            <Timeline events={transaction.timeline} currentStatus={currentStatus} />
          </div>

          {/* Service Details */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Service Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{transaction.serviceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Description</span>
                <span className="text-right max-w-[60%]">{transaction.serviceDescription}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Scheduled</span>
                <span>{transaction.scheduledDate} at {transaction.scheduledTime}</span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between">
                <span className="font-medium">Estimated Total</span>
                <span className="text-lg font-bold text-primary-600">
                  ₱{transaction.estimatedPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {canConfirmCompletion && (
              <button
                onClick={handleConfirmCompletion}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                <CheckCircle className="inline h-4 w-4 mr-2" />
                Confirm Completion
              </button>
            )}
            {canCancel && (
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="flex-1 sm:flex-none px-4 py-2.5 border border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
              >
                <XCircle className="inline h-4 w-4 mr-2" />
                Cancel Request
              </button>
            )}
            {currentStatus === "paid" && (
              <button className="flex-1 sm:flex-none px-4 py-2.5 border border-amber-200 text-amber-600 rounded-lg font-medium hover:bg-amber-50 transition-colors">
                <Star className="inline h-4 w-4 mr-2" />
                Leave a Review
              </button>
            )}
          </div>
        </div>

        {/* Sidebar - Technician Info */}
        <div className="space-y-6">
          {transaction.technicianId && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Your Technician</h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={transaction.technicianAvatar || "/Technician.png"}
                  alt={transaction.technicianName}
                  className="h-16 w-16 rounded-full object-cover border-2 border-primary-100"
                />
                <div>
                  <p className="font-medium">{transaction.technicianName}</p>
                  <div className="flex items-center gap-1 text-sm text-amber-600">
                    <Star className="h-4 w-4 fill-current" />
                    <span>4.9 (127 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                  <Phone className="h-4 w-4" />
                  Call
                </button>
                <button 
                  onClick={() => navigate("/dashboard/customer/messages")}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Message
                </button>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Need Help?</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm">
                📞 Contact Support
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm">
                ❓ FAQs
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm">
                📋 Service Terms
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card rounded-xl p-6 max-w-md w-full animate-scale-in">
            <h3 className="text-lg font-semibold mb-4">Complete Payment</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service</span>
                <span>{transaction.serviceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Amount</span>
                <span className="text-xl font-bold text-primary-600">
                  ₱{transaction.estimatedPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-between p-4 border-2 border-primary-600 bg-primary-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💳</span>
                  <span className="font-medium">GCash</span>
                </div>
                <CheckCircle className="h-5 w-5 text-primary-600" />
              </button>
              <button className="w-full flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary-300 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💵</span>
                  <span className="font-medium">Cash on Delivery</span>
                </div>
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-2.5 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessingPayment}
                className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors"
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="inline h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Pay Now"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card rounded-xl p-6 max-w-sm w-full animate-scale-in">
            <div className="text-center mb-6">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cancel Request?</h3>
              <p className="text-sm text-muted-foreground">
                Are you sure you want to cancel this service request? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 px-4 py-2.5 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
              >
                Keep Request
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
