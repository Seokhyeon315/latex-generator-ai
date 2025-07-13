import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Loading } from '@/components/loading'

describe('Loading Component', () => {
    it('renders loading animation when isLoading is true', () => {
        render(<Loading isLoading={true} />)
        expect(screen.getByText('Searching')).toBeInTheDocument()
    })

    it('does not render when isLoading is false', () => {
        render(<Loading isLoading={false} />)
        expect(screen.queryByText('Searching')).not.toBeInTheDocument()
    })

    it('renders with small size', () => {
        render(<Loading isLoading={true} size="sm" />)
        const spinner = screen.getByText('Searching').parentElement?.querySelector('div')
        expect(spinner).toHaveClass('w-8', 'h-8')
    })

    it('renders with large size', () => {
        render(<Loading isLoading={true} size="lg" />)
        const spinner = screen.getByText('Searching').parentElement?.querySelector('div')
        expect(spinner).toHaveClass('w-24', 'h-24')
    })

    it('applies custom className', () => {
        render(<Loading isLoading={true} className="custom-class" />)
        const container = screen.getByText('Searching').closest('div')
        expect(container).toHaveClass('custom-class')
    })
}) 