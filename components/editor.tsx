'use client';
import * as React from 'react';
// import styled from 'styled-components';
import axios from 'axios';
import { NextPage } from 'next';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { RangeStatic } from 'quill';

/* 추가된 코드 */
import { ImageResize } from 'quill-image-resize-module-ts';
Quill.register('modules/ImageResize', ImageResize);

interface IEditor {
    htmlStr: string;
    setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
}

const Editor: NextPage<IEditor> = ({ htmlStr, setHtmlStr}) => {

    const quillRef = React.useRef<ReactQuill>(null);

    // 이미지 업로드 핸들러, modules 설정보다 위에 있어야 정상 적용
    const imageHandler = () => {
        // file input 임의 생성
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();

        input.onchange = async() => {
            const file = input.files;
            // const formData = new FormData();


            if(file) {
                const reader = new FileReader();
                reader.readAsDataURL(file[0]);
                reader.onloadend = () => {
                    // setProfileImg(reader.result);

                    if(quillRef.current) {
                        // 현재 Editor 커서 위치에 서버로부터 전달받은 이미지 불러오는 url을 이용하여 이미지 태그 추가
                        const index = (quillRef.current.getEditor().getSelection() as RangeStatic).index;
        
                        const quillEditor = quillRef.current.getEditor();
                        quillEditor.setSelection(index, 1);
        
                        quillEditor.clipboard.dangerouslyPasteHTML(
                            index,
                            `<img src=${reader.result} alt=${'alt text'} />`
                        );
                    }
                };
            }
            // if(file) {
            //     formData.append("multipartFiles", file[0]);
            // }

            // file 데이터 담아서 서버에 전달하여 이미지 업로드
            // const res = await axios.post('http://localhost:8080/uploadImage', formData);
        }
    }

    // useMemo를 사용하지 않고 handler를 등록할 경우 타이핑 할때마다 focus가 벗어남
    const modules = React.useMemo(() => ({
            toolbar: {
                container: [
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ header: [1, 2, 3, false] }],
                [{ color: [] }, { background: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                ['link', 'image'],
                ['clean'],
                ],
            },

            // imageResize: {
            //     // parchment: Quill.import('parchment'),
            //     modules: [ 'Resize', 'DisplaySize' ]
            // }
        }
    ), [])

    // toolbar에 사용되는 tool format
    const formats = [
        'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'formula',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'align', 'color', 'background',        
    ]

    return (
        <ReactQuill
            className='h-full w-full'
            ref={quillRef}
            theme="snow" 
            modules={modules} 
            formats={formats} 
            value={htmlStr} 
            placeholder='내용을 입력하세요.'
            onChange={(content, delta, source, editor) => setHtmlStr(editor.getHTML())} />
    )
}

export default Editor;

// // style
// const CustomReactQuill = styled(ReactQuill)`
//     height: 300px;
// `