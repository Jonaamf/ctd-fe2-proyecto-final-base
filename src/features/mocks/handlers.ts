import { rest } from 'msw';
import { API_URL } from '../../app/constants';

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    const character = req.url.searchParams.get('character') ?? "";

    if (character === "Homer") {
      return res(
        ctx.status(200),
        ctx.json({
          results: [
            {
              cita: "In theory, Communism works! In theory.",
              direccionPersonaje: "Right",
              personaje: "Homer Simpson",
            },
          ],
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        results: [
          {
            cita: "You're turning me into a criminal when all I want to be is a petty thug.",
            direccionPersonaje: "Right",
            personaje: "Bart Simpson",
          },
        ],
      })
    );
  }),
];
