export const teamMember = {
  name: 'teamMember',
  title: 'Group member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-') // Mellomrom om til bindestrek
            .replace(/[åæø]/g, (char) => ({å: 'a', ø: 'o', æ: 'e'})[char] || char)
            .replace(/[^a-z0-9-]/g, '') // Fjerne rare tegn
            .slice(0, 50),
        maxLength: 50,
      },
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'bio',
      type: 'text',
      title: 'Biography',
    },
    {
      name: 'interests',
      type: 'array',
      title: 'Interests',
      of: [{type: 'string'}],
    },
  ],
};
