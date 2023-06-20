import MainCanvas from "../../components/MainCanvas";

const fileInfo = {
    userId: undefined,
    filename: undefined
}

export default function ThreeJsPage() {
    return (
        <div className="h-full">
            <MainCanvas {...fileInfo} />
        </div>
    );
}