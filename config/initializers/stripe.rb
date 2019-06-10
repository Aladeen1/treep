Rails.configuration.stripe = {
  publishable_key: 'pk_test_Ta4elcvBi6t0416IySdCtfTQ00scNDDgVl',
  secret_key:      ENV['STRIPE_SECRET_KEY']
}

Stripe.api_key = Rails.configuration.stripe[:secret_key]