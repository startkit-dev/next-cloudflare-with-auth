import { customType } from "drizzle-orm/sqlite-core"

export const citext = customType<{
  data: string
  notNull: true
  default: true
  config: { length?: number }
}>({
  dataType(config) {
    return `text${config?.length ? `(${config.length})` : ""} COLLATE NOCASE`
  }
})
