import * as React from "react";
import pkg from '@markdoc/markdoc'

const { renderers } = pkg;


interface MarkdownProps {
    content: any;
}
export function Markdown({ content }: MarkdownProps) {
	return (
		<>
			{renderers.react(content, React, {
				components: {},
			})}
		</>
	);
}
