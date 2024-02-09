interface GrainyProps {
    children: React.ReactNode;
}

export const Grainy = ({ children }: GrainyProps) => {
    return (
        <>
            <svg className="absolute h-full w-full" style={{ opacity: 0.1 }}>
                <filter id="grainy">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.9"
                        numOctaves={3}
                        seed={12312314}
                    />
                </filter>
            </svg>
            {children}
        </>
    );
};
