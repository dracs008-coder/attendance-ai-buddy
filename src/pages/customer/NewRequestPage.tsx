import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, CreditCard, Check, Loader2 } from "lucide-react";
import { StepIndicator } from "../../components/ui/StepIndicator";
import { serviceOptions, ServiceOption } from "../../data/transactions";
import { useCustomer } from "../../contexts/CustomerContext";
import toast from "react-hot-toast";
import { cn } from "../../lib/utils";

const steps = [
  { id: "service", title: "Service" },
  { id: "details", title: "Details" },
  { id: "schedule", title: "Schedule" },
  { id: "review", title: "Review" },
];

export default function NewRequestPage() {
  const navigate = useNavigate();
  const { newRequest } = useCustomer();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "gcash" | "card">("cash");

  const categories = [
    { id: "smartphone", label: "Smartphone", icon: "📱" },
    { id: "computer", label: "Computer", icon: "💻" },
    { id: "website", label: "Website", icon: "🌐" },
    { id: "bundle", label: "Bundles", icon: "📦" },
  ];

  const filteredServices = serviceOptions.filter(s => s.category === selectedCategory);

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedService !== null;
      case 1:
        return description.trim().length >= 10 && address.trim().length >= 5;
      case 2:
        return scheduledDate && scheduledTime;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate("/dashboard/customer");
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newId = `req-${Date.now()}`;
    newRequest({
      title: selectedService?.title || "Service Request",
      total: selectedService?.price || 0,
      images,
    });

    setIsSubmitting(false);
    toast.success("Request submitted successfully!");
    navigate(`/dashboard/customer/requests/${newId}`);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setImages(prev => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] pb-24 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          {currentStep === 0 ? "Back to Dashboard" : "Previous Step"}
        </button>
        <h1 className="text-2xl font-bold text-foreground">New Service Request</h1>
        <p className="text-muted-foreground mt-1">Complete the steps below to submit your request</p>
      </div>

      {/* Step Indicator - Desktop */}
      <div className="hidden lg:block mb-8">
        <StepIndicator steps={steps} currentStep={currentStep} orientation="horizontal" />
      </div>

      {/* Main Content */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Form Area */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            {/* Step 1: Service Selection */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Select Service Category</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setSelectedService(null);
                        }}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                          selectedCategory === cat.id
                            ? "border-primary-600 bg-primary-50"
                            : "border-border hover:border-primary-300"
                        )}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="text-sm font-medium">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedCategory && (
                  <div className="animate-fade-in">
                    <h2 className="text-lg font-semibold mb-4">Choose a Service</h2>
                    <div className="grid gap-3">
                      {filteredServices.map(service => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service)}
                          className={cn(
                            "flex items-center justify-between p-4 rounded-lg border-2 text-left transition-all",
                            selectedService?.id === service.id
                              ? "border-primary-600 bg-primary-50"
                              : "border-border hover:border-primary-300"
                          )}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{service.title}</span>
                              {service.popular && (
                                <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">Duration: {service.duration}</p>
                          </div>
                          <div className="text-right ml-4">
                            <span className="text-lg font-semibold text-primary-600">₱{service.price.toLocaleString()}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg font-semibold">Service Details</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Describe the issue or requirements *</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Please provide as much detail as possible..."
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {description.length}/10 characters minimum
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Service Address *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Enter your complete address"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Upload Photos (Optional)</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {images.map((img, i) => (
                        <div key={i} className="relative group">
                          <img src={img} alt="" className="h-20 w-full object-cover rounded-lg" />
                          <button
                            onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Schedule */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg font-semibold">Schedule Your Service</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={e => setScheduledDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Preferred Time *
                    </label>
                    <select
                      value={scheduledTime}
                      onChange={e => setScheduledTime(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select time slot</option>
                      <option value="08:00">8:00 AM - 10:00 AM</option>
                      <option value="10:00">10:00 AM - 12:00 PM</option>
                      <option value="13:00">1:00 PM - 3:00 PM</option>
                      <option value="15:00">3:00 PM - 5:00 PM</option>
                      <option value="17:00">5:00 PM - 7:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-800">
                    💡 Our technicians are typically available within 24 hours. You'll receive a confirmation once assigned.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg font-semibold">Review & Confirm</h2>

                <div className="divide-y divide-border">
                  <div className="py-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Service</h3>
                    <p className="font-medium">{selectedService?.title}</p>
                    <p className="text-sm text-muted-foreground">{selectedService?.description}</p>
                  </div>

                  <div className="py-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                    <p className="text-sm">{description}</p>
                  </div>

                  <div className="py-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Location</h3>
                    <p className="text-sm">{address}</p>
                  </div>

                  <div className="py-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Schedule</h3>
                    <p className="text-sm">
                      {scheduledDate && new Date(scheduledDate).toLocaleDateString("en-PH", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })} at {scheduledTime}
                    </p>
                  </div>

                  <div className="py-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Payment Method</h3>
                    <div className="flex gap-3">
                      {[
                        { id: "cash", label: "Cash", icon: "💵" },
                        { id: "gcash", label: "GCash", icon: "📱" },
                        { id: "card", label: "Card", icon: "💳" },
                      ].map(method => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id as "cash" | "gcash" | "card")}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all",
                            paymentMethod === method.id
                              ? "border-primary-600 bg-primary-50"
                              : "border-border hover:border-primary-300"
                          )}
                        >
                          <span>{method.icon}</span>
                          {method.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Panel - Sticky on Desktop */}
        <div className="hidden lg:block">
          <div className="sticky top-24 bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            
            {selectedService ? (
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium">{selectedService.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{selectedService.duration}</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between">
                  <span className="font-medium">Estimated Total</span>
                  <span className="text-xl font-bold text-primary-600">
                    ₱{selectedService.price.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Select a service to see pricing</p>
            )}

            {/* Step indicator - vertical on desktop sidebar */}
            <div className="mt-8 pt-6 border-t border-border">
              <StepIndicator steps={steps} currentStep={currentStep} orientation="vertical" />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA - Mobile & Desktop */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-card border-t border-border p-4 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Mobile Summary */}
          <div className="lg:hidden">
            {selectedService && (
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-lg font-bold text-primary-600">₱{selectedService.price.toLocaleString()}</p>
              </div>
            )}
          </div>

          <div className="flex gap-3 ml-auto">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
              >
                Back
              </button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Submit Request
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
