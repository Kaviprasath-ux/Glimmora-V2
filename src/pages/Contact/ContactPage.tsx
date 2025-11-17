import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, CONTACT_INFO } from '@/config/constants';
import { Card } from '@/components/ui';

export const ContactPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-neutral-700">
              We'd love to hear from you. Reach out to our team for reservations,
              inquiries, or just to say hello.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Cards */}
            <div className="space-y-6">
              {/* Main Contact */}
              <Card padding="lg">
                <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Location</h3>
                      <p className="text-neutral-600">
                        {CONTACT_INFO.address.street}<br />
                        {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state} {CONTACT_INFO.address.zip}<br />
                        {CONTACT_INFO.address.country}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Phone</h3>
                      <a
                        href={`tel:${CONTACT_INFO.phone}`}
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {CONTACT_INFO.phone}
                      </a>
                      <p className="text-sm text-neutral-500 mt-1">
                        Available {CONTACT_INFO.hours.frontDesk}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {CONTACT_INFO.email}
                      </a>
                      <p className="text-sm text-neutral-500 mt-1">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Hours */}
              <Card padding="lg">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 mb-4">Hours of Operation</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Front Desk</span>
                        <span className="font-medium text-neutral-900">{CONTACT_INFO.hours.frontDesk}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Check-in</span>
                        <span className="font-medium text-neutral-900">After {CONTACT_INFO.hours.checkIn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Check-out</span>
                        <span className="font-medium text-neutral-900">Before {CONTACT_INFO.hours.checkOut}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <Card padding="lg">
                <h3 className="font-semibold text-neutral-900 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href={CONTACT_INFO.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={24} className="text-primary-600" />
                  </a>
                  <a
                    href={CONTACT_INFO.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={24} className="text-primary-600" />
                  </a>
                  <a
                    href={`https://twitter.com/${CONTACT_INFO.social.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={24} className="text-primary-600" />
                  </a>
                  <a
                    href={CONTACT_INFO.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={24} className="text-primary-600" />
                  </a>
                </div>
              </Card>
            </div>

            {/* Right Column - Map Placeholder */}
            <div>
              <Card padding="none" className="h-full overflow-hidden">
                <div className="relative h-full min-h-[600px]">
                  {/* Map Placeholder - Replace with actual Google Maps embed */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <div className="text-center p-8">
                      <MapPin size={48} className="text-primary-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        {APP_NAME}
                      </h3>
                      <p className="text-neutral-700 mb-2">{APP_TAGLINE}</p>
                      <p className="text-sm text-neutral-600">
                        {CONTACT_INFO.address.street}<br />
                        {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state}
                      </p>
                      <p className="text-xs text-neutral-500 mt-4">
                        Google Maps integration coming soon
                      </p>
                    </div>
                  </div>

                  {/* Uncomment and add your Google Maps embed code here */}
                  {/*
                  <iframe
                    src="YOUR_GOOGLE_MAPS_EMBED_URL"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="TERRA Suites Location"
                  ></iframe>
                  */}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            Ready to Experience TERRA Suites?
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            Book your stay today and discover where modern luxury meets natural tranquility.
          </p>
          <a
            href="/rooms"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-primary-600 bg-white rounded-lg hover:bg-neutral-100 transition-colors"
          >
            View Available Rooms
          </a>
        </div>
      </section>
    </div>
  );
};
