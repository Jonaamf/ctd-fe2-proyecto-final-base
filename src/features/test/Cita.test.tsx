import { screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../mocks/server';
import { render } from '../../test-utils';
import Cita from '../quote/Cita';


test("renderizar componentes", () => {
    render(<Cita />);
  
    const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
    const button = screen.getByText(/Obtener cita/i);
    const buttonDelete = screen.getByText(/Borrar/i);
  
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(buttonDelete).toBeInTheDocument();
  });
  
  test('debería mostrar una cita aleatoria cuando no se ingresa un nombre', async () => {
    render(<Cita />);
  
    fireEvent.click(screen.getByRole('button', { name: /Obtener cita aleatoria/i }));
  
    await waitFor(() => {
      expect(screen.getByText(/I believe the children are the future... Unless we stop them now!/i)).toBeInTheDocument();
    });
  });
  
  test('debería mostrar una cita del personaje especificado 1', async () => {
    render(<Cita />);
  
    const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
    fireEvent.change(input, { target: { value: 'Homer' } });
    const button = screen.getByText(/Obtener Cita/i);
    fireEvent.click(button);
  
    await waitFor(() => {
      expect(screen.getByText("Facts are meaningless. You could use facts to prove anything that's even remotely true.")).toBeInTheDocument();
      expect(screen.getByText("Homer Simpson")).toBeInTheDocument();
    });
  });
  
  test('debería mostrar un mensaje de error si se ingresa un valor numérico', async () => {
    render(<Cita />);
  
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /Obtener cita/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument();
    });

  });