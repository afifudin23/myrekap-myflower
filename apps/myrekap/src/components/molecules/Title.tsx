function Title({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div className="mb-5 2xl:mb-10 flex flex-col 2xl:gap-2">
            <h1 className="text-3xl font-semibold 2xl:text-4xl 2xl:font-bold">{title}</h1>
            <p className="text-lg 2xl:text-xl font-light italic">{subtitle}</p>
        </div>
    );
}

export default Title;
