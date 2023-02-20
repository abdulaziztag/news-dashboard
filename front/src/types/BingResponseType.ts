export type SearchResponse = {
  value: NewsArticle[]
}

export type NewsArticle = {
  name: string
  url: string
  datePublished: string
  description: string
  image?: {
    thumbnail: {
      contentUrl: string
    }
  }
}
