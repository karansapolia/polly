# frozen_string_literal: true

class PollsController < ApplicationController
  def index
    @polls = Poll.all
  end
end
