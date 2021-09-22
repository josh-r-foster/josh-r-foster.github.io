library(shiny)
library(intrval)
library(qcc)

df = read.csv(url('https://josh-r-foster.github.io/courses/bus-4654/files/session-4/powerball-data-1.csv'))

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