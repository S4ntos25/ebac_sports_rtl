import { fireEvent, render, screen } from '@testing-library/react';
import Post from '.';

describe('Teste para o componente Post', () => {
    it('Deve renderizar o componente corretamente', () => {
        render(<Post/>);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    it('Deve inserir dois comentários e exibí-los na lista', () => {
        render(<Post/>);

        const textarea = screen.getByTestId('comment-input');
        const submitButton = screen.getByTestId('comment-submit');
        const list = screen.getByTestId('comments-list');

        // Primeiro comentário
        fireEvent.change(textarea, { target: { value: 'Primeiro comentário' } });
        fireEvent.click(submitButton);

        // Segundo comentário
        fireEvent.change(textarea, { target: { value: 'Segundo comentário' } });
        fireEvent.click(submitButton);

        // Verificações: dois itens renderizados e conteúdo presente
        const items = screen.getAllByTestId('comment-item');
        expect(items).toHaveLength(2);
        expect(list).toBeInTheDocument();
        expect(screen.getByText('Primeiro comentário')).toBeInTheDocument();
        expect(screen.getByText('Segundo comentário')).toBeInTheDocument();
    });
});