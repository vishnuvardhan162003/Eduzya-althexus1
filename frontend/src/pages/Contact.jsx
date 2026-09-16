import { useState } from 'react'
import { Mail, Phone, MapPin, CircleCheck } from 'lucide-react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialForm = { name: '', email: '', message: '' }

const Contact = () => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.email.trim()) {
      next.email = 'Email is required'
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      next.email = 'Please enter a valid email address'
    }
    if (!form.message.trim()) next.message = 'Message is required'
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // stops the browser's default GET submit / page reload

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      // TODO: replace with real API call, e.g.
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
      await new Promise((resolve) => setTimeout(resolve, 600))
      setSubmitted(true)
      setForm(initialForm)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = (field) =>
    `w-full rounded-lg border px-4 py-3 outline-none focus:border-gray-500 ${
      errors[field] ? 'border-red-400 focus:border-red-400' : 'border-gray-300'
    }`

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Contact Us
          </p>

          <h1 className="mb-5 text-4xl font-bold text-gray-900 md:text-5xl">
            Get in touch with us
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-600">
            Have a question or need help? We would love to hear from you.
            Send us a message and our team will get back to you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          
          {/* Contact Information */}
          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Contact Information
            </h2>

            <p className="mb-8 leading-7 text-gray-600">
              If you have any questions about our courses, learning platform,
              or services, feel free to contact us.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Mail className="h-5 w-5 text-gray-700" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-600">
                    eduzyraofficial@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Phone className="h-5 w-5 text-gray-700" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="mt-1 text-gray-600">
                    +91 76687 43501
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                  <MapPin className="h-5 w-5 text-gray-700" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="mt-1 text-gray-600">
                    Meerut, Uttar Pradesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Send us a message
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center gap-3 rounded-lg bg-green-50 py-10 text-center">
                <CircleCheck size={32} className="text-green-600" />
                <p className="font-semibold text-green-800">Message sent successfully!</p>
                <p className="text-sm text-green-700">We'll get back to you soon.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm font-medium text-gray-700 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange('name')}
                    className={inputClass('name')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange('email')}
                    className={inputClass('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Enter your message"
                    value={form.message}
                    onChange={handleChange('message')}
                    className={`resize-none ${inputClass('message')}`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60"
                >
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
