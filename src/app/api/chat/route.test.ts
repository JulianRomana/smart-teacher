import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'

// Mock the AI SDK
vi.mock('ai', () => ({
  createGateway: vi.fn(() => vi.fn()),
  streamText: vi.fn(() => ({
    toUIMessageStreamResponse: vi.fn(() =>
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    ),
  })),
  convertToModelMessages: vi.fn((messages) => Promise.resolve(messages)),
}))

describe('POST /api/chat', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 400 when messages array is missing', async () => {
    // Arrange
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    // Act
    const response = await POST(request)
    const data = await response.json()

    // Assert
    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid request: messages array required')
  })

  it('returns 400 when messages is not an array', async () => {
    // Arrange
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: 'not an array' }),
    })

    // Act
    const response = await POST(request)
    const data = await response.json()

    // Assert
    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid request: messages array required')
  })

  it('processes valid chat request successfully', async () => {
    // Arrange
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [
          { role: 'user', content: 'What is division of labor?' },
        ],
      }),
    })

    // Act
    const response = await POST(request)

    // Assert
    expect(response.status).toBe(200)
  })

  it('handles empty messages array', async () => {
    // Arrange
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [] }),
    })

    // Act
    const response = await POST(request)

    // Assert
    expect(response.status).toBe(200)
  })

  it('returns 500 on internal errors', async () => {
    // Arrange
    const { streamText } = await import('ai')
    vi.mocked(streamText).mockImplementationOnce(() => {
      throw new Error('Internal error')
    })

    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Test' }],
      }),
    })

    // Act
    const response = await POST(request)
    const data = await response.json()

    // Assert
    expect(response.status).toBe(500)
    expect(data.error).toBe('Internal server error')
  })
})
