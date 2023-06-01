import MainCanvas from "../../components/MainCanvas";

const tempModel = {
    userId: "0a576ac7-79b0-4808-92b2-de1391cc1271",
    filename: "s2xyoon.vrm"
}

export default function ThreeJsPage() {
    
    return (
        <div className="h-full">
            <MainCanvas {...tempModel} />
        </div>
    );
}