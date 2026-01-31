import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn (classNames utility)', () => {
  it('merges class names correctly', () => {
    // Arrange
    const baseClasses = 'px-4 py-2'
    const additionalClasses = 'bg-blue-500 text-white'

    // Act
    const result = cn(baseClasses, additionalClasses)

    // Assert
    expect(result).toContain('px-4')
    expect(result).toContain('py-2')
    expect(result).toContain('bg-blue-500')
    expect(result).toContain('text-white')
  })

  it('handles conditional classes', () => {
    // Arrange
    const isActive = true

    // Act
    const result = cn(
      'base-class',
      isActive && 'active-class',
      !isActive && 'inactive-class'
    )

    // Assert
    expect(result).toContain('base-class')
    expect(result).toContain('active-class')
    expect(result).not.toContain('inactive-class')
  })

  it('handles undefined and null values', () => {
    // Arrange & Act
    const result = cn('valid-class', undefined, null, 'another-class')

    // Assert
    expect(result).toContain('valid-class')
    expect(result).toContain('another-class')
  })

  it('resolves Tailwind conflicts correctly', () => {
    // Arrange - when there are conflicting Tailwind classes, tw-merge keeps the last one
    const result = cn('p-4', 'p-8')

    // Assert - p-8 should override p-4
    expect(result).toBe('p-8')
  })

  it('returns empty string when no classes provided', () => {
    // Arrange & Act
    const result = cn()

    // Assert
    expect(result).toBe('')
  })
})
