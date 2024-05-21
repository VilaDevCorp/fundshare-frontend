import logo from '/logo.svg';

export function PublicFormLayout({
    children,
    title
}: {
    children: JSX.Element | JSX.Element[];
    title?: string;
}) {
    return (
        <section
            className={`flex md:w-[500px] w-full p-8 
            rounded-lg md:h-auto max-h-[900px] m-auto mt-auto ml-auto mr-auto flex-col gap-2 `}
        >
            <img
                src={logo}
                alt="Logo"
                className="mb-10 self-center  w-[200px]"
            />
            <h2 className="mb-4">{title}</h2>
            <div className="flex flex-col gap-3">{children}</div>
        </section>
    );
}
