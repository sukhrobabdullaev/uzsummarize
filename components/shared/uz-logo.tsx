interface UzLogoProps {
    width?: number
    height?: number
    className?: string
}

export default function UzLogo({ width = 100, height = 100, className = "" }: UzLogoProps) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Rounded blue square background */}
            <rect x="20" y="20" width="260" height="260" rx="70" fill="#4D90FE" />

            {/* Custom "U" shape */}
            <path
                d="M100 90 
             C100 90, 100 190, 100 190 
             C100 210, 120 210, 140 210"
                stroke="white"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />

            {/* Custom "Z" shape */}
            <path
                d="M160 90 
             H220 
             L140 210 
             H220"
                stroke="white"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    )
}
