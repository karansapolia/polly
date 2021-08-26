# frozen_string_literal: true

require "test_helper"

class TaskTest < ActiveSupport::TestCase
  def setup
    @poll = Poll.new(title: "This is a test poll", options: "[\"2\",\"3\",\"4\",\"5\"]", results: "[1,2,1,0]")
  end

  def test_instance_of_poll
    assert_instance_of Poll, @poll
  end

  def test_not_instance_of_user
    assert_not_instance_of User, @poll
  end

  def test_value_of_title_assigned
    poll = Poll.new(title: "Title assigned for testing")
    assert_equal "Title assigned for testing", poll.title
  end

  def test_value_created_at
    assert_nil @poll.created_at

    @poll.save!
    assert_not_nil @poll.created_at
  end

  test "error raised" do
    assert_raises ActiveRecord::RecordNotFound do
      Poll.find(SecureRandom.uuid)
    end
  end

  def test_count_of_number_of_polls
    assert_difference ["Poll.count"], 2 do
      Poll.create!(title: "Creating a Poll through test",  options: "[\"2\",\"3\",\"4\",\"5\"]", results: "[1,2,1,0]")
      Poll.create!(
        title: "Creating another Poll through test",  options: "[\"2\",\"3\",\"4\",\"5\"]",
        results: "[1,2,1,0]")
    end
  end

  def test_poll_should_not_be_valid_without_title
    @poll.title = nil
    puts @poll.title
    assert @poll.invalid?
  end
end
