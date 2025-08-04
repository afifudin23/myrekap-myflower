interface BadgeProps {
    className: string;
    children: string;
}

function Badge({ className, children}: BadgeProps) {
    return (
        <div className={`${className} flex justify-center items-center rounded-md text-white`}>
            <h1>{children}</h1>
        </div>
    );
}

export default Badge;
