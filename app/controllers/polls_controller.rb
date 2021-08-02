# frozen_string_literal: true

class PollsController < ApplicationController
  def index
    polls = Poll.all
    render status: :ok, json: { polls: polls }
  end

  def create
    poll = Poll.new(poll_params)
    if poll.save
      render status: :ok, json: { notice: t("successfully_created") }
    else
      errors = poll.errors.full_messages.to_sentence
      render status: :unporcessable_entity, json: { errors: errors }
    end
  end
end
