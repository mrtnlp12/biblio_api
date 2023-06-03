import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.routes'
import bookRoutes from './routes/book.routes'
import editorialRoutes from './routes/editorial.routes'
import loanRoutes from './routes/loan.routes'
import searchRoutes from './routes/search.routes'
import authorRoutes from './routes/author.routes'
import areaRoutes from './routes/area.routes'
import genreRoutes from './routes/genre.routes'
import userRoutes from './routes/user.routes'
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use('/auth', authRoutes)
app.use('/books', bookRoutes)
app.use('/editorials', editorialRoutes)
app.use('/loans', loanRoutes)
app.use('/search', searchRoutes)
app.use('/authors', authorRoutes)
app.use('/areas', areaRoutes)
app.use('/genres', genreRoutes)
app.use('/users', userRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
