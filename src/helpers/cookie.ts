const cookie = {
  read(name: string): string | null {
    let str = '(^|;\\s*)(' + name + ')=([^;]*)'
    const match = document.cookie.match(new RegExp(str))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
