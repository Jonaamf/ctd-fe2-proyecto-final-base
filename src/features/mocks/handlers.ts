import { rest } from 'msw';
import { API_URL } from '../../app/constants';

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    const character = req.url.searchParams.get('character') ?? "";
    console.log("character");
    if (character === "Homer") {
      return res(
        ctx.status(200),
        ctx.json([
          {
            quote: "In theory, Communism works! In theory.",
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