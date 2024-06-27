import { rest } from 'msw';
import { API_URL } from '../../app/constants';

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    const character = req.url.searchParams.get('character') ?? "";
    if (character === "Homer Simpson") {
      return res(
        ctx.status(200),
        ctx.json([
          {
            quote: "All I'm gonna use this bed for is sleeping, eating and maybe building a little fort.",
            characterDirection: "Right",
            character: "Homer Simpson",
          },
        ])
      );
    }

    return res(
      ctx.status(200),
      ctx.json([
        {
          quote: "You're turning me into a criminal when all I want to be is a petty thug.",
          characterDirection: "Right",
          character: "Bart Simpson",
        },
      ])
    );
  }),
];
