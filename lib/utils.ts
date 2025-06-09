export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  export function getReadingTime(content: string) {
    const words = content.split(/\s+/).length
    return Math.ceil(words / 200)
  }