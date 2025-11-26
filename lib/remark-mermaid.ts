import { visit } from 'unist-util-visit';
import type { Transformer } from 'unified';
import type { Code, Root } from 'mdast';

export function remarkMermaid(): Transformer<Root> {
    return (tree) => {
        visit(tree, 'code', (node: Code, index, parent) => {
            if (node.lang === 'mermaid' && parent && index !== undefined) {
                parent.children.splice(index, 1, {
                    type: 'mdxJsxFlowElement',
                    name: 'Mermaid',
                    attributes: [
                        {
                            type: 'mdxJsxAttribute',
                            name: 'code',
                            value: node.value,
                        },
                    ],
                    children: [],
                } as any);
            }
        });
    };
}
