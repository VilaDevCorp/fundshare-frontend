import { Typography } from '../ui/Typography';
import logo from '/logo.svg';

export function PublicFormLayout({
    children,
    onSubmit,
    title
}: {
    children: JSX.Element | JSX.Element[];
    onSubmit: () => void;
    title?: string;
}) {
    return (
        <section
            className={`flex max-w-[500px] w-full md:p-8 
            rounded-lg md:h-auto max-h-[900px] m-auto mt-auto ml-auto mr-auto flex-col gap-6 `}
        >
            <img src={logo} alt="Logo" className=" self-center  w-[200px]" />
            <Typography type="title">{title}</Typography>
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
                {children}
            </form>
        </section>
    );
}
