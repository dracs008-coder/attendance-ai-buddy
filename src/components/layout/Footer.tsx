import { Link } from "react-router-dom";
import { Wrench, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold">GigaEase</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Professional tech services at your fingertips. Fast, reliable, and affordable.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#services" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/request" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>


          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4" />
                support@gigaease.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4" />
                (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4" />
                123 Tech Street, City
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} GigaEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
