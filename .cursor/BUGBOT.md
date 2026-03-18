# Bugbot Review Criteria

## Security
- All API endpoints validate input before processing
- No SQL injection or XSS vulnerabilities
- Passwords are never logged or returned in responses
- Email validation prevents malicious input

## Validation
- All form inputs have both client and server validation
- Edge cases: empty strings, unicode characters, very long inputs
- Email format validation follows RFC 5322
- Error messages are user-friendly and specific

## Performance
- No unnecessary re-renders in React components
- API routes respond within 200ms
- No blocking operations on the main thread

## Accessibility
- All form inputs have associated labels
- Error messages use aria-live regions
- Keyboard navigation works throughout the flow
- Color contrast meets WCAG AA standards

## Architecture Boundaries
- Components don't call APIs directly (use hooks or server actions)
- Validation logic lives in src/lib/validators/, not in components
- Types are centralized in src/lib/types.ts
- No business logic in page components
