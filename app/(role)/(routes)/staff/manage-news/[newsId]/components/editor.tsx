import React, { useCallback, useRef, useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { htmlToMarkdown, markdownToHtml } from './parser';
import uploadToCloudinary from "./uploadImg";
import "./editor.css";
import dynamic from 'next/dynamic';

// const ReactQuill = dynamic(async () => {
//     const ReactQuill = await import('react-quill');
//     const { Quill } = ReactQuill.default;
//     const Block = Quill.import('blots/block');
//     Block.tagName = 'div';
//     Quill.register(Block);

//     return ReactQuill;
// }, { ssr: false });

export interface EditorContentChanged {
    html: string;
    markdown: string;
}

export interface EditorProps {
    value?: string;
    onChange?: (changes: EditorContentChanged) => void;
    previewContent?: (content: string) => void;
    className?: string;
}

export default function Editor(props: EditorProps) {
    const [editorContent, setEditorContent] = useState<string>(props.value || "");
    const reactQuillRef = useRef<ReactQuill>(null);
    const Block = Quill.import('blots/block');
    Block.tagName = 'div';
    Quill.register(Block);

    useEffect(() => {
        // Update the editor content when the `value` prop changes
        setEditorContent(props.value || "");
    }, [props.value]);

    const onChange = (content: string) => {
        setEditorContent(content);

        if (props.onChange) {
            props.onChange({
                html: content,
                markdown: htmlToMarkdown(content),
            });
        }

        if (props.previewContent) {
            props.previewContent(content);
        }
    };

    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                const url = await uploadToCloudinary(file);
                const quill = reactQuillRef.current;
                if (quill) {
                    const range = quill.getEditorSelection();
                    range && quill.getEditor().insertEmbed(range.index, "image", url);
                }
            }
        };
    }, []);

    return (
        <div className={props.className}>
            <ReactQuill

                ref={reactQuillRef}
                theme="snow"
                placeholder="Start writing..."
                modules={{
                    toolbar: {
                        container: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ size: [] }],
                            ["bold", "italic", "underline", "strike", "blockquote"],
                            [
                                { list: "ordered" },
                                { list: "bullet" },
                                { indent: "-1" },
                                { indent: "+1" },
                            ],
                            ["link", "image", "video"],
                            ["code-block"],
                            ["clean"],
                        ],
                        handlers: {
                            image: imageHandler,
                        },
                    },
                    clipboard: {
                        matchVisual: false,
                    },
                }}
                formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                    "code-block",
                ]}
                value={editorContent}
                onChange={onChange}
            />
        </div>
    );
}
