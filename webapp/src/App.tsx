// src/App.tsx
//assets/shoes.png 를 display. onClick 시 api.ts/classifyItem 호출. response (class, accuracy) 를 받은 후 화면에 출력
import React, {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {getModelInference} from "./api/api.ts";
import image from './assets/shoes.png';
import {modelResultType} from "./model/modelResult.ts";
import {convertImageToFile} from "./encode/encode.ts";

const App: React.FC = () => {
    const [result, setResult] = useState<modelResultType | undefined>(undefined);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);


    const { mutateAsync: getInferenceResult} = useMutation({
        mutationFn: async (params: {
            file: File
        }) : Promise<modelResultType> => {
            return await getModelInference(params.file);
        },
        onSuccess: (data: modelResultType) => {
            setResult(data); // 성공적으로 데이터를 받아오면 상태 업데이트
            setImageLoaded(true); // 이미지가 로드되었음을 표시
        },
        onError: (error: any) => {
            console.error("예측 중 오류 발생:", error);
        }
    });

    const handleClick = async () => {
        const file = await convertImageToFile(image);
        await getInferenceResult({file});
    }

    return (
        <div>
            <h1>FashionMnist 이미지 분류</h1>
            <div>
                {image && <img src={image} alt="Uploaded" style={{maxWidth: '200px', marginTop: '10px'}} onClick={handleClick}/>}
            </div>
            {imageLoaded && (<div> {result?.class} </div>)}
        </div>
    );
};

export default App;
