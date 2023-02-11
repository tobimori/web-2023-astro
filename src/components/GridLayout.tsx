import { Fragment } from 'react'

type Thumbnail = {
  type: string
  image: {
    alt: string
    url: string
    srcset: string
  }
}

type ExtendedThumbnail = Thumbnail & {
  slug: string
  tags: string[]
  title: string
  uuid: string
}

type Props = {
  elements: {
    slug: string
    tags: string[]
    title: string
    uuid: string
    thumbnails: Thumbnail[]
  }[]
}

const thumbnailsToValue = (thumbnails: (Thumbnail | null)[]) =>
  thumbnails.reduce(
    (acc, curr) => (curr ? acc + (curr.type === 'rectangle' ? 2 : 1) : acc),
    0
  )

const mapThumbnailsToRows = (elements: Props['elements']) => {
  let data = elements.map(({ thumbnails, ...el }) =>
    thumbnails.map((t) => ({ ...t, ...el }))
  )
  let rows = []
  let row: ExtendedThumbnail[] = []

  while (data.length > 0) {
    while (data[0].length > 0) {
      const nextElement = data[0][0]
      const nextGroup = data[1]?.length > 0 ? data[1][0] : null

      const fitsNextGroup =
        data[1]?.length > 0
          ? thumbnailsToValue([...row, nextGroup]) <=
              (rows.length % 2 === 1 ? 4 : 3) && row.length < 3
          : false

      const fitsNextElement =
        thumbnailsToValue([...row, nextElement]) <=
          (rows.length % 2 === 1 ? 4 : 3) && row.length < 3

      const fitsBoth =
        thumbnailsToValue([...row, nextElement, nextGroup]) <=
        (rows.length % 2 === 1 ? 4 : 3)

      if (row.length > 0 && fitsNextGroup && !fitsBoth) {
        const thumbnail = data[1].shift()
        if (thumbnail) row.push(thumbnail)
      } else if (fitsNextElement) {
        const thumbnail = data[0].shift()
        if (thumbnail) row.push(thumbnail)
      } else {
        rows.push(row)
        row = []
      }
    }

    if (row.length && !data[1]) rows.push(row) // if we have a row and no elements left, push it
    data.shift()
  }

  return rows
}

export const GridLayoutItem: React.FC<{ element: ExtendedThumbnail }> = ({
  element: el
}) => {
  return (
    <a href={`/${el.slug}`} className={`grid-layout_item is-${el.type}`}>
      <img src={el.image.url}></img>
    </a>
  )
}

export const GridLayout: React.FC<Props> = ({ elements }) => {
  const rows = mapThumbnailsToRows(elements)

  return (
    <div className="grid-layout">
      {rows.map((row, o) => (
        <div className="grid-layout_row" key={o}>
          {row.map((el, i) => {
            const points = thumbnailsToValue(row)

            return (
              <Fragment key={i}>
                {points + i < 5 && o % 2 === 1 && i !== row.length - 1 && (
                  <div className="grid-layout_placeholder"></div>
                )}
                <GridLayoutItem element={el} />
                {points + i < 5 && o % 2 === 0 && i !== row.length - 1 && (
                  <div className="grid-layout_placeholder"></div>
                )}
              </Fragment>
            )
          })}
        </div>
      ))}
    </div>
  )
}
