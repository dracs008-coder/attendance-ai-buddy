export interface LinkDetectionOptions {
  maxDisplayLength?: number
  addExternalIndicator?: boolean
  openInNewTab?: boolean
  customClasses?: string
}

export function linkifyText(text: string, options: LinkDetectionOptions = {}): string {
  const {
    maxDisplayLength = 30,
    addExternalIndicator = true,
    openInNewTab = true,
    customClasses = '',
  } = options

  const urlRegex =
    /(https?:\/\/[^\s<>'"{}|\\^`\[\]]+|www\.[^\s<>'"{}|\\^`\[\]]+|(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?:\/[^\^\s<>'"{}|\\^`\[\]]*)?)/gi

  return text.replace(urlRegex, url => {
    let href = url.trim()
    let displayUrl = url.trim()

    if (!href.startsWith('http://') && !href.startsWith('https://')) {
      href = `https://${href}`
    }

    if (displayUrl.length > maxDisplayLength) {
      displayUrl = displayUrl.substring(0, maxDisplayLength - 3) + '...'
    }

    const isExternal =
      addExternalIndicator &&
      (href.startsWith('http://') ||
        (href.startsWith('https://') && !href.includes('localhost') && !href.includes('127.0.0.1')))

    const baseClasses = 'auto-link-detected'
    const indicatorClass = isExternal ? 'external-link' : 'link-indicator'
    const allClasses = `${baseClasses} ${indicatorClass} ${customClasses}`.trim()

    const targetAttr = openInNewTab ? 'target="_blank"' : ''
    const relAttr = openInNewTab ? 'rel="noopener noreferrer"' : ''

    return `<a href="${href}" ${targetAttr} ${relAttr} class="${allClasses}" title="${url}" data-original-url="${url}">${displayUrl}</a>`
  })
}

export function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

export function containsUrl(text: string): boolean {
  const urlRegex =
    /(https?:\/\/[^\s<>'"{}|\\^`\[\]]+|www\.[^\s<>'"{}|\\^`\[\]]+|(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,})/gi
  return urlRegex.test(text)
}

export function extractUrls(text: string): string[] {
  const urlRegex =
    /(https?:\/\/[^\s<>'"{}|\\^`\[\]]+|www\.[^\s<>'"{}|\\^`\[\]]+|(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?:\/[^\^\s<>'"{}|\\^`\[\]]*)?)/gi
  return text.match(urlRegex) || []
}

export function sanitizeText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

export function safelyLinkifyText(text: string, options: LinkDetectionOptions = {}): string {
  const sanitized = sanitizeText(text)
  return linkifyText(sanitized, options)
}
