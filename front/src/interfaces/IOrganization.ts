export interface SubscriptionMini {
  name: string
  _id: string
}

export interface Organization extends SubscriptionMini {
  linkedin: string
  twitter: string
  otherSources: [object]
}
