library(shiny)
library(lattice)
library(ggplot2)
library(tidyverse)

v = c(5, 5)
lo = c(1, 1)
hi = c(10, 10)
step = c(1, 1)
label = c('Increase/Decrease Demand','Increase/Decrease Supply','Equilibrium','Consumer Surplus')
msecs = 1000/4

ui = fluidPage(
  sidebarLayout(
    sidebarPanel(
      sliderInput('v1', label[1], lo[1], hi[1], v[1], step[1], ticks=FALSE, 
                  animate = animationOptions(msecs)),
      sliderInput('v2', label[2], lo[2], hi[2], v[2], step[2], ticks=FALSE, 
                  animate = animationOptions(msecs)),
      checkboxInput('v3', label[3], value = FALSE, width = NULL), 
      checkboxInput('v4', label[4], value = FALSE, width = NULL)
    ),
    mainPanel(plotOutput('plot'))
  )
)