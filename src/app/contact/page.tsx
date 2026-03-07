import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.fullName}. We are happy to answer your questions.`,
};

export default function ContactPage() {
  return (
    <div>
      {/* Page Hero */}
      <div className="bg-indigo-900 text-white py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-600 text-white mb-4">
            Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Contact Us
          </h1>
          <p className="mt-4 text-white/75 text-lg max-w-2xl">
            Have a question about admissions, programs, or anything else? We&apos;re here to help.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 bg-gray-50">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/10 text-indigo-900 mb-4">
              Send a Message
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            return (
              <div>
                {/* Page Hero */}
                <div className="bg-indigo-900 text-white py-20 px-4">
                  <div className="mx-auto max-w-7xl text-center">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-violet-600 text-white mb-4">
                      Get in Touch
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                      Contact Us
                    </h1>
                    <p className="mt-4 text-white text-lg font-bold max-w-2xl mx-auto">
                      Have a question about admissions, programs, or anything else? We&apos;re here to help.
                    </p>
                  </div>
                </div>

                <section className="mx-auto max-w-7xl px-6 py-20 bg-gray-50">
                  <div className="grid gap-12 md:grid-cols-3">
                    {/* Contact Form */}
                    <div className="md:col-span-2">
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-900/10 text-indigo-900 mb-4">
                        Send a Message
                      </div>
                      <h2 className="text-3xl font-extrabold text-indigo-900 mb-8">Send Us a Message</h2>
                      <div className="bg-white rounded-xl shadow-lg p-8">
                        <ContactForm />
                      </div>
                    </div>

                    {/* Contact Info & Map */}
                    <div className="space-y-8">
                      {/* Info Card */}
                      <div className="bg-white shadow-lg rounded-xl p-8">
                        <div className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-5">Campus Office</div>
                        <div className="space-y-4">
                          {[...
                            <div key={item.label} className="flex items-start gap-3">
                              <span className="text-lg mt-0.5">{item.icon}</span>
                              <div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">{item.label}</div>
                                {item.href ? (
                                  <a
                                    href={item.href}
                                    className="text-sm font-bold text-indigo-900 hover:text-violet-600 underline underline-offset-4"
                                  >
                                    {item.value}
                                  </a>
                                ) : (
                                  <div className="text-sm font-bold text-gray-700">{item.value}</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Office Hours */}
                      <div className="bg-white shadow-lg rounded-xl p-8">
                        <div className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-4">Office Hours</div>
                        <div className="space-y-2 text-sm font-bold text-gray-700">
                          <div className="flex justify-between">
                            <span>Sun – Fri</span>
                            <span className="font-bold">9:00 AM – 5:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday</span>
                            <span className="font-bold text-red-500">Closed</span>
                          </div>
                        </div>
                      </div>

                      {/* Map */}
                      <div className="rounded-2xl border border-black/10 overflow-hidden shadow-lg">
                        <iframe
                          title="Jayaprithivi Campus Location"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3479.12!2d81.19!3d29.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDMyJzI0LjAiTiA4McKwMTEnMjQuMCJF!5e0!3m2!1sen!2snp!4v1614000000000"
                          width="100%"
                          height="220"
                          style={{ border: 0, display: "block" }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                        <div className="p-3 text-xs font-bold text-gray-500 text-center">
                          Chainpur, Bajhang, Sudurpashchim Province, Nepal
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            );
