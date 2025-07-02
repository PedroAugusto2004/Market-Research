import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom FinE colors
				'fine-green': {
					50: '#f0fff4',
					100: '#dcfce7',
					500: '#22c55e',
					600: '#16a34a',
					700: '#15803d',
					900: '#14532d'
				},
				'fine-yellow': {
					400: '#facc15',
					500: '#eab308',
					600: '#ca8a04'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'fade-in-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'bounce-in': {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'50%': { transform: 'scale(1.05)', opacity: '0.8' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'pulse-green': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.7)' },
					'70%': { boxShadow: '0 0 0 10px rgba(34, 197, 94, 0)' }
				},
				'bg-float': {
					'0%': { transform: 'translateY(0) scale(1) rotate(0deg)' },
					'25%': { transform: 'translateY(-40px) scale(1.08) rotate(8deg)' },
					'50%': { transform: 'translateY(10px) scale(1.04) rotate(-6deg)' },
					'75%': { transform: 'translateY(-20px) scale(1.06) rotate(4deg)' },
					'100%': { transform: 'translateY(0) scale(1) rotate(0deg)' }
				},
				'bg-float2': {
					'0%': { transform: 'translateY(0) scale(1) rotate(0deg)' },
					'20%': { transform: 'translateY(30px) scale(1.07) rotate(-7deg)' },
					'50%': { transform: 'translateY(-20px) scale(1.03) rotate(5deg)' },
					'80%': { transform: 'translateY(20px) scale(1.06) rotate(-3deg)' },
					'100%': { transform: 'translateY(0) scale(1) rotate(0deg)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'slide-in-left': 'slide-in-left 0.5s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'bounce-in': 'bounce-in 0.6s ease-out',
				'pulse-green': 'pulse-green 2s infinite',
				'bg-float': 'bg-float 14s ease-in-out infinite',
				'bg-float2': 'bg-float2 18s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
	safelist: [
		'animate-bg-float',
		'animate-bg-float2',
	]
} satisfies Config;
