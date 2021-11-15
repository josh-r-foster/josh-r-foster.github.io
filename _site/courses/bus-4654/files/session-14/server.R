library(shiny)
library(lattice)
library(ggplot2)
library(tidyverse)

maxn = 20
demand.curve = vector()
supply.curve = vector()
for(n in seq(maxn)) {
  demand.curve = rbind(demand.curve,data.frame('Q'=c(n,n+10),'P'=c(11,1),'f'=n,'Type'='Demand'))
  supply.curve = rbind(supply.curve,data.frame('Q'=c(n+10,n),'P'=c(11,1),'f'=n,'Type'='Supply'))
}
market = rbind(demand.curve,supply.curve)

market.plot = function(v1, v2)
  ggplot(market) + 
  geom_line(data = filter(market, abs(f - v1) < 0.1 & Type=='Demand'), aes(x=Q,y=P)) + 
  geom_line(data = filter(market, abs(f - v2) < 0.1 & Type=='Supply'), aes(x=Q,y=P)) + 
  geom_text(data=filter(market, abs(f - v1) < 0.1 & Type=='Demand' & P==1),aes(Q,P,label='Demand Curve'),nudge_y=-0.25) + 
  geom_text(data=filter(market, abs(f - v2) < 0.1 & Type=='Supply' & P==11),aes(Q,P,label='Supply Curve'),nudge_y=0.25) + 
  xlim(0,maxn+1) + 
  ylim(0,12)

server = function(input, output, session) {
  session$onSessionEnded(function() shiny::stopApp())
  output$plot = renderPlot({
    if(input$v3) {
      if(input$v4) {
        market.plot(input$v1, input$v2) + 
          geom_line(data = data.frame('Q'=c(5+(input$v1+input$v2)/2,5+(input$v1+input$v2)/2),'P'=c(0,6+(input$v1-input$v2)/2)), aes(x=Q,y=P),linetype='dashed') + 
          geom_line(data = data.frame('Q'=c(0,5+(input$v1+input$v2)/2),'P'=c(6+(input$v1-input$v2)/2,6+(input$v1-input$v2)/2)), aes(x=Q,y=P),linetype='dashed') + 
          geom_polygon(data=data.frame(x=c(input$v1,0,0,5+(input$v1+input$v2)/2),y=c(11,11,6+(input$v1-input$v2)/2,6+(input$v1-input$v2)/2)),aes(x,y),fill='green',color='black',alpha=0.5)
      } else {
        market.plot(input$v1, input$v2) + 
          geom_line(data = data.frame('Q'=c(5+(input$v1+input$v2)/2,5+(input$v1+input$v2)/2),'P'=c(0,6+(input$v1-input$v2)/2)), aes(x=Q,y=P),linetype='dashed') + 
          geom_line(data = data.frame('Q'=c(0,5+(input$v1+input$v2)/2),'P'=c(6+(input$v1-input$v2)/2,6+(input$v1-input$v2)/2)), aes(x=Q,y=P),linetype='dashed')
      }
    } else if(input$v4) {
      market.plot(input$v1, input$v2) + 
        geom_polygon(data=data.frame(x=c(input$v1,0,0,5+(input$v1+input$v2)/2),y=c(11,11,6+(input$v1-input$v2)/2,6+(input$v1-input$v2)/2)),aes(x,y),fill='green',color='black',alpha=0.5)
    } else {
      market.plot(input$v1, input$v2)
    }
  })
}