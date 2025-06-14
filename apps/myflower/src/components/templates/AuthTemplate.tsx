function AuthTemplate({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gradient-to-t from-[#FFFFFF] to-[#8039de] h-screen flex">
            <h1>MyFlower</h1>
            <div>{children}</div>
        </div>
    );
}

export default AuthTemplate;
