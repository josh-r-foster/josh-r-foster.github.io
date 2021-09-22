library(shiny)
library(intrval)
library(qcc)

df = read.csv('/Users/joshfoster/Desktop/powerball-2.csv')

jackpot = df$jackpot
sales = df$revenue
tickets = df$tickets

prob.space = seq(0,1,length.out=101)

wp = function(p,g) {
  p^g/(p^g+(1-p)^g)^(1/g)
}

exp.val = function(g,jackpot) {
  v = wp(1/175223510,g)*jackpot*1000000
  v = v+wp(1/5153632,g)*1000000
  v = v+wp(1/648975,g)*10000
  v = v+wp(1/19087,g)*100
  v = v+wp(1/12244,g)*100
  v = v+wp(1/360,g)*7
  v = v+wp(1/706,g)*7
  v = v+wp(1/110,g)*4
  v = v+wp(1/55,g)*4
  return(v)
}

## UI function
ui <- fluidPage(
  fluidRow(
    splitLayout(cellWidths = c("50%", "50%"), plotOutput("plot1"), plotOutput("plot2"))
  ),
  sliderInput("g", "Model Parameter",
              min=0, max=2, value=1, step=0.01,
              animate=animationOptions(100)
  )
)

# Server logic
server <- function(input, output) {
  output$plot1 <- renderPlot({
    Main <- "Probability Weighting Function"
    probs <- sapply(seq(0,1,length.out=101),wp,g=input$g)
    plot(prob.space, probs, main = Main, col='blue',xlab = 'True Probability', ylab = 'Perceived Probability')
    lines(prob.space,prob.space,col='black')
  })
  output$plot2 <- renderPlot({
    Main2 <- paste("Powerball Ticket Sales", "(Under Old Rules)", sep="\n")
    plot(jackpot, sales, main = Main2, col='black',xlab = 'Jackpot (in Millions of $)', ylab = 'Ticket Sales (in Millions of $)')
    revs = (sapply(jackpot,exp.val,g=input$g)/12)^3
    revs = revs-min(revs)+mean(sales[sales<25])
    points(jackpot, revs, col='blue')
  })
}

## Run shiny app
if (interactive()) shinyApp(ui, server)
