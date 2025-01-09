import { useCallback, useEffect, useRef, useState } from 'react'

export function useMergedState<T>(
  defaultStateValue: T | (() => T),
  props?: {
    defaultValue?: T | (() => T)
    value?: T
    onChange?: (value: T, prevValue: T) => void
  }
) {
  const { defaultValue, value, onChange } = props || {}
  const [innerValue, setInnerValue] = useState<T>(() => {
    if (value !== undefined) {
      return value
    }
    if (defaultValue !== undefined) {
      return typeof defaultValue === 'function'
        ? (defaultValue as any)()
        : defaultValue
    }
    return typeof defaultStateValue === 'function'
      ? (defaultStateValue as any)()
      : defaultStateValue
  })

  const prevValueRef = useRef<T>(value as T)

  useEffect(() => {
    if (value === undefined) return

    setInnerValue(value)
  }, [value])

  const triggerChange = useCallback(
    (newValue: T) => {
      if (value === undefined) {
        setInnerValue(newValue)
      }

      if (onChange && newValue !== prevValueRef.current) {
        onChange(newValue, prevValueRef.current)
      }

      prevValueRef.current = newValue
    },
    [value, onChange]
  )

  return [innerValue, triggerChange] as const
}
