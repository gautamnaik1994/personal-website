const customMediaQuery = (minWidth: number) =>
  `@media (min-width: ${minWidth}px)`;

const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(992),
  tablet: customMediaQuery(768),
  phone: customMediaQuery(576),
};

export default media;

//const Content = styled.div`
//height: 3em;
//width: 3em;
//background: papayawhip;

//[> Now we have our methods on media and can use them instead of raw queries <]
//${media.desktop} {
//background: dodgerblue;
//}
//${media.tablet} {
//background: mediumseagreen;
//}
//${media.phone} {
//background: palevioletred;
//}
//`;
