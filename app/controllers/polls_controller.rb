# frozen_string_literal: true

class PollsController < ApplicationController
  def index
    polls = Poll.all
    render status: :ok, json: { polls: polls }
  end

  def create
    binding.pry
    poll = Poll.new(poll_params)
    if poll.save
      render status: :ok, json: { notice: t("successfully_created") }
    else
      errors = poll.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

    def poll_params
      params.require(:poll).permit(:title, :options)
    end
end
